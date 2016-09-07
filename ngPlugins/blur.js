// https://gist.github.com/justinwp/5d29ecaa7a9b934defe6
// For blurring angular ng-click elements on click.
app.directive('blur', [function () {
    return {
        link: function (scope, element) {
            element.on('click', function () {
                element.blur();
            });
        }
    };
}]);
