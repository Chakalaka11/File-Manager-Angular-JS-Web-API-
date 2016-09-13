
var url = "http://localhost:51296/api/default/getContent/getContent?callback=JSON_CALLBACK";
var absolutePath;

app.controller('MainPageContr', function ($scope, $http) {
    $scope.directories = [];
    $scope.files = [];
    $scope.title = 'File Manager layout';
    $scope.group = [0, 0, 0];
    $scope.bars = [
        'Less 10 Mb',
        '10 Mb - 50 Mb',
        'More 100 Mb',
    ];
    $scope.goto = function (event) {
        if (event != null) {
            var clicked = event.target.childNodes[0].data;
            console.log(clicked);
            if(clicked=="../")
            {
                //absolutePath
                alert();
            }
            else{
              absolutePath = absolutePath+"\\"+clicked;
            }
        }
        request();
    };
    function request() {
        $http.post(url, { path: absolutePath }).success(function (data, status, headers, config) {
            $scope.directories = data.Directories;
            $scope.files = data.Files;
            $scope.group = data.SizeGroups;
        }).error(function (data, status, headers, config) {
            console.log(data);
            console.log(status);
        });
    }
    $http.get(url).success(function (data, status, headers, config) {
        absolutePath = data.path;
        $scope.goto();
    }).error(function (data, status, headers, config) {
        console.log(data);
        console.log(status);
    });
});