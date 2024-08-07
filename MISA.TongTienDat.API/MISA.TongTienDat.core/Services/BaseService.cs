using MISA.TongTienDat.core.DTOs;
using MISA.TongTienDat.core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TongTienDat.core.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        IBaseRepository<T> repository;
        public BaseService(IBaseRepository<T> repository)
        {
            repository = repository;
        }

        public StatusDTO InsertService(T entity)
        {
            throw new NotImplementedException();
        }

        public StatusDTO UpdateService(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
