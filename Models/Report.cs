using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesManagment.Models
{
    //Report Model
    public class Report
    {
        public string text{ get; set; }
        public string assign_date { get; set; }
        public int emp_id { get; set; }
        public int manager_id { get; set; }


    }
}
