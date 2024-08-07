using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.TongTienDat.core.DTOs;
using MISA.TongTienDat.core.Entities;
using MISA.TongTienDat.core.Interfaces;

namespace MISA.TongTienDat.API.Controllers
{
    [Route("api/v1/Employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _employeeRepository; 
        IEmployeeService _employeeService;

        public EmployeesController(IEmployeeRepository repository, IEmployeeService service)
        {
            _employeeRepository = repository;
            _employeeService = service; 
        }

        [HttpGet]
        public IActionResult Get()
        {
            var res = _employeeRepository.Get();
            return StatusCode(200, res);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var res = _employeeRepository.Get(id);
            return StatusCode(200, res);
        }

        [HttpGet("CreateEmployee/NewCode")]
        public IActionResult GetNewCode()
        {
            var res = _employeeRepository.GetNewCode();
            return StatusCode(200, res);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var res = _employeeRepository.Delete(id);
            var message = new StatusDTO
            {
                Success = true,
                StatusCode = 200
            };
            return StatusCode(200, message);
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            try
            {
                var result = _employeeService.InsertService(employee);
                if (result.Success == true)
                {
                    return StatusCode(200, result);
                }
                else
                {
                    return StatusCode(400, result);
                }
            }
            catch (Exception ex)
            {
                var res = new
                {
                    userMgs = "Có lỗi xảy ra",
                    devMsg = "",
                    error = ex.Message
                };

                return StatusCode(500, res);
            }
        }

        [HttpPost("Update")]
        public IActionResult Update(Employee employee)
        {
            try
            {
                var result = _employeeService.UpdateService(employee);
                if (result.Success == true)
                {
                    return StatusCode(200, result);
                }
                else
                {
                    return StatusCode(400, result);
                }
            }
            catch (Exception ex)
            {
                var res = new
                {
                    userMgs = "Có lỗi xảy ra",
                    devMsg = "",
                    error = ex.Message
                };

                return StatusCode(500, res);
            }
        }
    }
}
