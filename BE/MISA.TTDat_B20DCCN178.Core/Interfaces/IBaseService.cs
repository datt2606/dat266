using MISA.TTDat_B20DCCN178.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TTDat_B20DCCN178.Core.Interfaces
{
    public interface IBaseService<T> where T : class
    {
        MessageResponse InsertService(T entity);
        MessageResponse UpdateService(T entity);
    }
}
