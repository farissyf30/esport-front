import $ from 'jquery';
// window.$ = $;
window.$ = window.jQuery = $;

(function($) {
  $.fn.gracket = function(method) {
    $.fn.gracket.defaults = {
      gracketClass : "g_gracket",
      gameClass : "g_game",
      roundClass : "g_round",
      roundLabelClass : "g_round_label",
      teamClass : "g_team",
      winnerClass : "g_winner",
      spacerClass : "g_spacer",
      currentClass : "g_current",
      seedClass : "g_seed",
      cornerRadius : 15,
      canvasId : "g_canvas",
      canvasClass : "g_canvas",
      canvasLineColor : "#eee",
      canvasLineCap : "round",
      canvasLineWidth : 2,
      canvasLineGap : 15,
      roundLabels : [],
      src : []
    };

    var 
      container = this,
      data = (typeof container.data("gracket") === "undefined") ? [] :
                (typeof container.data("gracket") === "string") ? JSON.parse(container.data("gracket")) :
                    container.data("gracket"),
      team_count,
      round_count,
      game_count,
      max_round_width = [],
      round,
      game,
      spacer,
      team,
      _playerHt,
      _totalItemWidth
    ;
    
    $.fn.gracket.settings = {}

    var methods = {
      init : function(options) {
        
        // merge options with settings
        this.gracket.settings = $.extend({}, this.gracket.defaults, options);

        if (this.gracket.settings.src.length)
          data = this.gracket.settings.src;

        // always prepend unique id to canvas id, as we dont want dupes
        this.gracket.settings.canvasId = this.gracket.settings.canvasId + "_" + ((new Date()).getTime());

        // build empty canvas
        var 
          _canvas = document.createElement("canvas");
          _canvas.id = this.gracket.settings.canvasId;
          _canvas.className = this.gracket.settings.canvasClass;
          _canvas.style.position = "absolute";
          _canvas.style.left = 0;
          _canvas.style.top = 0;
          _canvas.style.right = "auto";

        container
          .addClass(this.gracket.settings.gracketClass)
          .prepend(_canvas);

        
        round_count = data.length;
        for (var r=0; r < round_count; r++) {
          
          var round_html = helpers.build.round(this.gracket.settings);
          container.append(round_html);   
    
          game_count = data[r].length;    
          for (var g=0; g < game_count; g++) {
          
            var 
              game_html = helpers.build.game(this.gracket.settings),
              outer_height = container.find("." + this.gracket.settings.gameClass).outerHeight(true),
              spacer = helpers.build.spacer(this.gracket.settings, outer_height, r, (r !== 0 && g === 0) ? true : false)
            ;
            
            if (g % 1 == 0 && r !== 0) round_html.append(spacer);
            
            round_html.append(game_html);
            
            team_count = data[r][g].length;
            for (var t=0; t < team_count; t++) {
    
              var team_html = helpers.build.team(data[r][g][t], this.gracket.settings);
              game_html.append(team_html);

              var team_width = team_html.outerWidth(true);
              if (max_round_width[r] === undefined || max_round_width[r] < team_width)
                  max_round_width[r] = team_width;

              if (team_count === 1) {
                
                game_html.prev().remove()
                
                helpers.align.winner(game_html, this.gracket.settings, game_html.parent().prev().children().eq(0).height());

                helpers.listeners(this.gracket.settings, data, game_html.parent().prev().children().eq(1));
                
              }
    
            };
    
          };
          
        };
      }
    
    };
    
    var helpers = {
      build : {
        team : function(data, node){
          var html = [
            '<h3'+ ((typeof data.score === "undefined") ? "" : " title=\"Score: " + data.score + "\"") +'>',
              '<span class="' + node.seedClass + '">',
                ((typeof data.displaySeed === "undefined") ? data.seed : data.displaySeed),
              '</span>',
              '&nbsp;' + data.name + '&nbsp;',
              '<small>',
                ((typeof data.score === "undefined") ? "" : data.score),
              '</small>',
            '</h3>'
          ].join("");
          return team = $("<div />", {
            "html" : html,
            "class" : node.teamClass + " " + (data.id || "id_null")
          });
        },
        game : function(node){
          return game = $("<div />", {
            "class" : node.gameClass
          });
        },
        round : function(node){
          return round = $("<div />", {
            "class" : node.roundClass
          });
        },
        spacer : function(node, yOffset, r, isFirst){
          return spacer = $("<div />", {
            "class" : node.spacerClass
          }).css({
            "height" : (isFirst) ?  (((Math.pow(2, r)) - 1) * (yOffset / 2)) : ((Math.pow(2, r) -1) * yOffset)
          });
        },
        labels : function(data, offset){
          
          var 
            off = offset,
            i,
            len = data.length,
            left,
            widthPadding = 0
          ;

          for (i = 0; i < len; i++) {
            left = (i === 0 ? off.padding + widthPadding : off.padding + widthPadding + (off.right * i));
            $("<h5 />", {
              "html" : (off.labels.length ? off.labels[i] : "Round " + (i + 1)),
              "class" : off["class"]
            }).css({
              "position" : "absolute",
              "left" : left,
              "width" : offset.width
            }).prependTo(container);
            widthPadding += max_round_width[i]
          };

        },
        canvas : {
          resize : function(node){
            var canvas = document.getElementById(node.canvasId);
            canvas.height = container.innerHeight();
            canvas.width = container.innerWidth();
            $(canvas).css({
              height : container.innerHeight(),
              width : container.innerWidth(),
              zIndex : 1,
              pointerEvents : "none"
            });
          },        
          draw : function(node, data, game_html){           
            
            var canvas = document.getElementById(node.canvasId);
            
            if (typeof G_vmlCanvasManager != "undefined") {
              G_vmlCanvasManager.initElement(canvas);
            };
            
            var ctx = canvas.getContext('2d');
            
            
            var
              _itemWidth = max_round_width[0],
              _itemHeight = game_html.outerHeight(true),
              _paddingLeft = (parseInt(container.css("paddingLeft")) || 0),
              _paddingTop = (parseInt(container.css("paddingTop")) || 0),
              _marginBottom = (parseInt(game_html.css("marginBottom")) || 0),
              _startingLeftPos = _itemWidth + _paddingLeft,
              _marginRight = (parseInt(container.find("> div").css("marginRight")) || 0),           
              _cornerRadius = node.cornerRadius,
              _lineGap = node.canvasLineGap,
              _playerGap = (game_html.height() - 2 * game_html.find("> div").eq(1).height())
              _playerHt = game_html.find("> div").eq(1).height(),
              _totalItemWidth = 0
            ;

            if (typeof console !== "undefined")
              console.info("Padding Left: " + _paddingLeft + "px", "Player/Name Width: " + _itemWidth + "px", "Container padding left: " + _startingLeftPos + "px");

            if (_cornerRadius > _itemHeight/3) _cornerRadius = _itemHeight/3;
            
            if (_cornerRadius > _marginRight/2) _cornerRadius = _marginRight/2 - 2;
            
            if (_cornerRadius <= 0) _cornerRadius = 1;
              
            if (_lineGap > _marginRight/3) _lineGap = _marginRight/3;           
            
            ctx.strokeStyle = node.canvasLineColor;
            ctx.lineCap = node.canvasLineCap;
            ctx.lineWidth = node.canvasLineWidth;
            
            ctx.beginPath();                        
            
            var 
              p = Math.pow(2, data.length - 2),         
              i = 0,
              j,
              r = 0.5,
              ifOneGame = ((i === 0 && p === 1) ? true : false)
            ;

            if (ifOneGame) {
                var _ref = $("." + node.gameClass);
                var _item = _ref.eq( _ref.length - 1 );
                _itemHeight = _item.outerHeight(true);
                _itemWidth = _item.outerWidth(true);
            };

            while (p >= 1) {
            
              for (j = 0; j < p; j++) {     

                if (p == 1) r = 1;                

                var 
                  xInit = (ifOneGame) ? (_itemWidth + _paddingLeft) : (_startingLeftPos + _totalItemWidth + i *_marginRight),
                  xDisp = r * _marginRight,
                  yInit = ((Math.pow(2, i-1) - 0.5) * (i && 1) + j * Math.pow(2, i)) * _itemHeight + _paddingTop + ((ifOneGame) ? (_ref.find("> div").eq(1).height()) : (_playerHt)) + _playerGap/2
                ;

                if (p > 1) {
                  ctx.moveTo(xInit + _lineGap, yInit);
                  ctx.lineTo(xInit + xDisp - _cornerRadius, yInit);
                } else {
                  ctx.moveTo(xInit + _lineGap, yInit)
                  ctx.lineTo(xInit + (3*_lineGap), yInit);
                }

                if (p > 1 && j % 2 == 0) {
                  var yTop = yInit + _cornerRadius;
                  var yBottom = yInit + Math.pow(2, i)*_itemHeight - _cornerRadius;
                  ctx.moveTo(xInit + xDisp, yTop);
                  ctx.lineTo(xInit + xDisp, yBottom);

                  var 
                    _cx = xInit + xDisp - _cornerRadius,
                    _cy = yInit + _cornerRadius
                  ;
                  
                  ctx.moveTo(_cx, _cy - _cornerRadius);
                  ctx.arcTo(_cx + _cornerRadius, _cy - _cornerRadius, _cx + _cornerRadius, _cy, _cornerRadius);
                  
                  _cy = yInit + Math.pow(2, i)*_itemHeight - _cornerRadius; 
                  ctx.moveTo(_cx + _cornerRadius, _cy - _cornerRadius);
                  ctx.arcTo(_cx + _cornerRadius, _cy + _cornerRadius, _cx, _cy + _cornerRadius, _cornerRadius);                 
                  
                  var yMiddle = (yTop + yBottom) / 2;
                  ctx.moveTo(xInit + xDisp, yMiddle);
                  ctx.lineTo(xInit + xDisp + _lineGap, yMiddle);
                }               
              }
              i++;
              _itemWidth = max_round_width[i];
              _totalItemWidth += _itemWidth;
              p = p/2;
            }           
            
            ctx.stroke();

            // draw labels
            helpers.build.labels(data, {
              "padding" : _paddingLeft,
              "left" : _startingLeftPos,
              "right" : _marginRight,
              "labels" : node.roundLabels,
              "class" : node.roundLabelClass
            });
                                  
          }
        }
      },
      align : {
        winner : function(game_html, node, yOffset){
          var ifOneGame = (game_html.parent().siblings().not("canvas").length === 1) ? true : false;
          var offset = ifOneGame ? yOffset - (game_html.height() + (game_html.height() / 2)) : yOffset + (game_html.height() / 2);
          return game_html.addClass(node.winnerClass).css({ 
            "margin-top" : offset
          });
        }
      }, 
      listeners : function(node, data, game_html){  
        
        var _gameSelector = "." + node.teamClass + " > h3";
        $.each($(_gameSelector), function(e){
          var id = "." + $(this).parent().attr("class").split(" ")[1];
          if (id !== undefined) {
            $(id).hover(function(){
              $(id).addClass(node.currentClass);
            }, function(){
              $(id).removeClass(node.currentClass);
            });
          };
        });

        helpers.build.canvas.resize(node);
        helpers.build.canvas.draw(node, data, game_html);
        
      }
    };
  
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method "' +  method + '" does not exist in gracket!');
    }
  
  }

})(jQuery);