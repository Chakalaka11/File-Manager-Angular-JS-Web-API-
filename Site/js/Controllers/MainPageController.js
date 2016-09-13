
var url = "http://localhost:51296/api/default/getContent/getContent?callback=JSON_CALLBACK";
var absolutePath;

app.controller('MainPageContr', function ($scope, $http) {


    $http.get(url).success(function (data, status, headers, config) {
        absolutePath = data.path;
        console.log(absolutePath);
    }).error(function (data, status, headers, config) {
        console.log(data);
        console.log(status);
    });
    $scope.directories = [];
    $scope.files = [];
    $scope.title = 'File Manager layout';
    $scope.bars = [
        'Less 10 Mb',
        '10 Mb - 50 Mb',
        'More 100 Mb',
    ];
    $scope.goto = function (event) {
        $http.post(url, { path: absolutePath }).success(function (data, status, headers, config) {
            console.log(data);
            $scope.directories = data.Directories;
            $scope.files = data.Files;
            console.log(status);
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });
    };
}
);