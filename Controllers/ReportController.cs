using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using EmployeesManagment.Models;


namespace EmployeesManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //Report Controller
    public class ReportController : ControllerBase
    {
        public string connectionString = "Data Source=.;Initial Catalog= 2bPrecise;Integrated Security=True";

        public ReportController()
        {
        }

        [HttpGet("{id}")]
        //Get reports by manager id
        public JsonResult Get(int id)
        {
            string query = @"select * from dbo.Reports where manager_id ="+id;
            DataTable table = new DataTable();
            string sqlDataSource = connectionString;
            SqlDataReader myReader;
            System.Diagnostics.Debug.WriteLine(sqlDataSource + " " + sqlDataSource);
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
        [HttpPost]
        //Add new report to DB
        public JsonResult Post(Report report)
        {
            System.Diagnostics.Debug.WriteLine(report + " ");
             string query = @"insert into dbo.Reports(text,assign_date,emp_id,manager_id)
                               values ('" + report.text + "','"
                                         + report.assign_date + "','"
                                         + report.emp_id + "','"
                                         + report.manager_id + "')";

               DataTable table = new DataTable();
               string sqlDataSource = connectionString;
               SqlDataReader myReader;
               System.Diagnostics.Debug.WriteLine(query + " ");
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
            return new JsonResult("Add Report Succsessfully");
        }
    }
}
