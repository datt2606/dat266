using MISA.TongTienDat.core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TongTienDat.core.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        bool CheckCodeDuplicate(string EmployeeCode);
        string GetNewCode();
    }
}
