using MISA.TongTienDat.core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TongTienDat.core.Interfaces
{
    public interface IBaseService<T> where T : class
    {
        StatusDTO InsertService(T entity);
        StatusDTO UpdateService(T entity);
    }
}
