using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using EmployeesManagment.Models;


namespace EmployeesManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //Task Controller
    public class TaskController : ControllerBase
    {
        public string connectionString = "Data Source=.;Initial Catalog= 2bPrecise;Integrated Security=True";

        public TaskController()
        {
        }

        [HttpGet("{id}")]

        //Get Tasks by employee id
        public JsonResult Get(int id)
        {
            string query = @"select * from dbo.Tasks where emp_id =" + id;
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

        //Add new task to DB
        public JsonResult Post(Task task)
        {
            System.Diagnostics.Debug.WriteLine(task + " ");
            string query = @"insert into dbo.Tasks(text,assign_date,due_date,emp_id,manager_id)
                               values ('" + task.text + "','"
                                        + task.assign_date + "','"
                                        + task.due_date + "','"
                                        + task.emp_id + "','"
                                        + task.manager_id + "')";

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
            return new JsonResult("Add Task Succsessfully");
        }


    }
}
