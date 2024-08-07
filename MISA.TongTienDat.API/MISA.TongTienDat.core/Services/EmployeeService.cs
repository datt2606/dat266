using MISA.TongTienDat.core.DTOs;
using MISA.TongTienDat.core.Entities;
using MISA.TongTienDat.core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TongTienDat.core.Services
{
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository repository)
        {
            _employeeRepository = repository;
        }
        public StatusDTO InsertService(Employee entity)
        {
            var isDuplicate = _employeeRepository.CheckCodeDuplicate(entity.EmployeeCode);
            if (isDuplicate)
            {
                var message = new StatusDTO
                {
                    Success = false,
                    StatusCode = 400,
                };
                message.Errors.Add("Mã nhân viên đã tồn tại!");
                return message;
            }
            entity.EmployeeId = Guid.NewGuid();
            var res = _employeeRepository.Insert(entity);
            return new StatusDTO
            {
                Success = true,
                StatusCode = 200
            };
        }

        public StatusDTO UpdateService(Employee entity)
        {
            var res = _employeeRepository.Update(entity);
            return new StatusDTO
            {
                Success = true,
                StatusCode = 200
            };
        }
    }
}
