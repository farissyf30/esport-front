import { defineConfig } from 'vite'
import nunjucks from "vite-plugin-nunjucks";
import { resolve } from "path";
import inject from '@rollup/plugin-inject';
const path = require('path')

const outDir = resolve(__dirname, "dist");
const root = resolve(__dirname, "src");

export default defineConfig({
  base: '',
  root: root,
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      "~swiper": path.resolve(__dirname, "node_modules/swiper"),
      "~aos": path.resolve(__dirname, "node_modules/aos"),
      "~datepicker": path.resolve(__dirname, "node_modules/@chenfengyuan/datepicker"),
      "~jqueryUi":  path.resolve(__dirname, "node_modules/jquery-ui"),
      "~lightgallery":  path.resolve(__dirname, "node_modules/lightgallery"),
      "~bracket":  path.resolve(__dirname, "node_modules/jquery-bracket"),
    }
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        forgot: resolve(root, "forgot-password.html"),
        main2: resolve(root, "index-logged.html"),
        login: resolve(root, "login.html"),
        profile: resolve(root, "profile.html"),
        reset: resolve(root, "reset-password.html"),
        register: resolve(root, "sign-up.html"),
        about: resolve(root, "about-us.html"),
        settingpassword: resolve(root, "setting-password.html"),
        settingorder: resolve(root, "setting-order.html"),
        settingdeactive: resolve(root, "setting-deactive.html"),
        faq: resolve(root, "faq.html"),
        blog: resolve(root, "blog.html"),
        blogdetail: resolve(root, "blog-detail.html"),
        tournament: resolve(root, "tournament.html"),
        tournamentdetail: resolve(root, "tournament-detail.html"),
        exchange: resolve(root, "exchange.html"),
        exchangedetail: resolve(root, "exchange-detail.html"),
        checkoutorder: resolve(root, "checkout-order.html"),
        orderreview: resolve(root, "order-review.html"),
        wallet: resolve(root, "wallet.html"),
        withdraw: resolve(root, "withdraw.html"),
        withdrawsummary: resolve(root, "withdraw-summary.html"),
        orderreviewwithdraw: resolve(root, "order-review-withdraw.html"),
        history: resolve(root, "history.html"),
        topupsummary: resolve(root, "topup-summary.html"),
        topuppayment: resolve(root, "topup-payment.html"),
        tournamentbracket: resolve(root, "tournament-bracket.html"),

      },
      output: {
        assetFileNames: (assetInfo) => {
          var info = assetInfo.name.split(".");
          var extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          } else if (/woff|woff2/.test(extType)) {
            extType = "fonts";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    }
  },
  server: {
    port: 3004,
    hot: true
  },
  plugins: [
    nunjucks(),
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ]
}
)