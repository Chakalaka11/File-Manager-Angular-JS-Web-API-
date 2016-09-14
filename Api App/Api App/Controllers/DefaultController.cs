using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace Api_App.Controllers
{
    [EnableCors("*", "*", "*")]
    public class DefaultController : ApiController
    {
        [HttpPost]
        public object getContent(dynamic paramts)
        {
            string absolutePath = paramts.path;
            DirectoryInfo dirinfo = new DirectoryInfo(absolutePath);
            var filesIn = dirinfo.GetFiles();// get files with all needed information
            var directoriesIn = dirinfo.GetDirectories();//get directories
            List<string> files = new List<string>();
            List<string> directories = new List<string>();
            int[] size_groups = { 0, 0, 0 };
            foreach (var item in filesIn)//get numbers of files , grouped by size
            {
                files.Add(item.Name);
                if (item.Length < 10485760)
                    size_groups[0]++;
                if (item.Length >= 10485760&&item.Length<52428800)
                    size_groups[1]++;
                if (item.Length > 104857600)
                    size_groups[2]++;
            };
            foreach (var item in directoriesIn)
            {
                directories.Add(item.Name);
            }
            return new { Files = files, Directories = directories,SizeGroups =  size_groups};//transfer to front-end
        }
        public object getContent()
        {
            return new {path = HttpRuntime.AppDomainAppPath };
        }
    }
}
