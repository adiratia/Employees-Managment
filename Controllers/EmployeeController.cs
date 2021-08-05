using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using EmployeesManagment.Models;
using Microsoft.AspNetCore.Hosting;

namespace EmployeesManagment.Controllers
{
    [Route("api/{controller}")]

    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public string connectionString = "Data Source=.;Initial Catalog= 2bPrecise;Integrated Security=True";

        public EmployeeController()
        {
            
        }
        [HttpGet]
        //Get all employees from DB.
        public JsonResult Get()
        {
            //Sql query
            string query = @"select * from dbo.Employees";
            DataTable table = new DataTable();
            //Connection String
            string sqlDataSource = connectionString;

            SqlDataReader myReader;
            System.Diagnostics.Debug.WriteLine(sqlDataSource + " " + sqlDataSource);
            //Create new sql connection
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                //Execute the sql qury
                using (SqlCommand myCommand = new SqlCommand(query, myCon)){
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    //Close the connection
                    myCon.Close();
                    }

            }
            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        //Get Employee by id from DB
        public JsonResult getById(int id)
        {
            //Query
            string query = @"select * from dbo.Employees where id="+id;
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
       
        [HttpGet("manager/{id}")]
        //Get Employees by manager
        public JsonResult getByManager(int id)
        {
            //Sql query
            string query = @"select * from dbo.Employees where manager=" + id;
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





        [HttpPost]
        //Add new employee to DB
        public JsonResult Post(Employee emp)
        {
            string query = @"insert into dbo.Employees(first_name,last_name,position,is_manager,manager)
                            values ('"+emp.firstName+ "','"
                                      +emp.lastName+"','"
                                      +emp.position+ "','" 
                                      + emp.isManager + "','"
                                      +emp.manager+"')";
            
            DataTable table = new DataTable();
            string sqlDataSource = connectionString;
            SqlDataReader myReader;
            System.Diagnostics.Debug.WriteLine(query + " " );
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
            return new JsonResult("Add Succsessfully");
        }
    }
}
