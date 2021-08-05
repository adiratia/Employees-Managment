using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public string connectionString = "Data Source=.;Initial Catalog= 2bPrecise;Integrated Security=True";
        [HttpGet("{username}")]
        //Get Employee by id from DB
        public JsonResult getUser(string username)
        {
            //Query
            string query = @"select * from dbo.Users where username=" +"'"+ username+"'";
            DataTable table = new DataTable();
            string sqlDataSource = connectionString;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult(table);
        }
    }
}
