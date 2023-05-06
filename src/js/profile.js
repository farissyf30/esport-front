$('.cover-upload').change(function () {
    const file = this.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            $('.cover-preview').attr('src', event.target.result);
        }
        reader.readAsDataURL(file);
    }
});
$('.profile-upload').change(function () {
    const file = this.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            $('.profile-preview').attr('src', event.target.result);
        }
        reader.readAsDataURL(file);
    }
});