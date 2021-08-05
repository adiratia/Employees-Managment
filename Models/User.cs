using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesManagment.Models
{
    public class User
    {
        [Required]
        public string username { get; set; }
        public string password { get; set; }

    }
}
