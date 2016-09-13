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
        public string getSmth()
        {
            return "Hello , World!";
        }
        [HttpPost]
        public object getContent(dynamic paramts)
        {
            string absolutePath = paramts.path;
            DirectoryInfo dirinfo = new DirectoryInfo(absolutePath);
            string[] files = Directory.GetFiles(absolutePath);
            string[] directories = Directory.GetDirectories(absolutePath);
            
            return new { Files = files, Directories = directories };
        }
        public object getContent()
        {
            string[] files = Directory.GetFiles(HttpRuntime.AppDomainAppPath);
            string[] directories = Directory.GetDirectories(HttpRuntime.AppDomainAppPath);
            return new { Files = files, Directories = directories, path = HttpRuntime.AppDomainAppPath };
        }
        public void getBack()
        {

        }
    }
}
