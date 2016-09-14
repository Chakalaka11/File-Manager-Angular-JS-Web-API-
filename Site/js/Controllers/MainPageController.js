
var url = "http://locationapiapp.azurewebsites.net/api/default/getContent?callback=JSON_CALLBACK";


app.controller('MainPageContr', function ($scope, $http) {
    $scope.directories = [];
    $scope.files = [];
    $scope.title = 'File Manager layout';
    $scope.group = [0, 0, 0];
    $scope.absolutePath = {};
    $scope.bars = [
        'Less 10 Mb',
        '10 Mb - 50 Mb',
        'More 100 Mb'];
    $scope.goto = function (event) {
        if (event != null) {
            var clicked = event.target.childNodes[0].data;
            console.log(clicked);
            if (clicked == "../") {
                var preEndSlashIndex =$scope.absolutePath.lastIndexOf("\\",$scope.absolutePath.length-2)+1;
                $scope.absolutePath = $scope.absolutePath.substring(0, preEndSlashIndex);

            }
            else {
                $scope.absolutePath = $scope.absolutePath  + clicked+ "\\";
            }
        }
        request();
    };
    function request() {
        $http.post(url, { path: $scope.absolutePath }).success(function (data, status, headers, config) {
            $scope.directories = data.Directories;
            $scope.files = data.Files;
            $scope.group = data.SizeGroups;
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });
    }
    $http.get(url).success(function (data, status, headers, config) {
        $scope.absolutePath = data.path;
        $scope.goto();
    }).error(function (data, status, headers, config) {
        console.log(data);
        console.log(status);
    });
});