using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesManagment.Models
{
    //Employee Model
    public class Employee
    {
        public string firstName { get; set; }
        public string lastName { get; set; }

        public string position { get; set; }

        public int isManager { get; set; }
        public int manager { get; set; }



    }
}
