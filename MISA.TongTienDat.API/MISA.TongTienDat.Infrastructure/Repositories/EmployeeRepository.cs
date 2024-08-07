using Dapper;
using MISA.TongTienDat.core;
using MISA.TongTienDat.core.Entities;
using MISA.TongTienDat.core.Interfaces;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TongTienDat.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository, IDisposable
    {
        IDbConnection _connection;
        public EmployeeRepository(IDbConnection connection)
        {
            _connection = new MySqlConnection(Common.DatabaseName);
        }

        public bool CheckCodeDuplicate(string EmployeeCode)
        {
            throw new NotImplementedException();
        }

        public int Delete(string id)
        {
            var className = "Employee";
            var sql = $"DELETE FROM {className} WHERE {className}Id = @id";
            var parameters = new DynamicParameters();
            parameters.Add("@id", id);
            var res = _connection.Execute(sql, parameters);
            return res;
        }

        public void Dispose()
        {
            _connection.Dispose();
        }

        public List<Employee> Get()
        {
            var classname = "Employee";
            var sql = $"SELECT * FROM {classname} ORDER BY {classname}Code DESC";
            var data = _connection.Query<Employee>(sql);
            return data.ToList();
        }

        public Employee? Get(string id)
        {
            var className = "Employee";
            var sql = $"SELECT * FROM {className} WHERE {className}Id = @id";
            var parameters = new DynamicParameters();
            parameters.Add("@id", id);
            var data = _connection.QueryFirstOrDefault<Employee>(sql, parameters);
            return data;
        }

        public string GetNewCode()
        {
            var className = "Employee";
            var sql = $"SELECT * FROM {className} ORDER BY EmployeeCode DESC";
            var res = _connection.QueryFirstOrDefault<Employee>(sql);
            // Tách phần số từ chuỗi
            string prefix = res.EmployeeCode.Substring(0, 3); // "NV-"
            string numberPart = res.EmployeeCode.Substring(3); // "000001"

            // Chuyển phần số sang số nguyên
            int number = int.Parse(numberPart);

            // Tăng giá trị số lên 1
            number++;

            // Định dạng lại thành chuỗi với số mới
            string newNumberPart = number.ToString("D6"); // Đảm bảo có 6 chữ số với các số 0 dẫn đầu
            string newString = prefix + newNumberPart;

            return newString;
        }

        public 

        public int Insert(Employee entity)
        {
            var className = "Employee";
            var propListName = "";
            var propListValue = "";
            // lấy ra tất cả các props của entity
            var props = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            // duyệt từng props
            foreach (var prop in props)
            {
                // lấy ra tên của prop
                var propname = prop.Name; // EmployeeId
                var val = prop.GetValue(entity);

                // lấy ra values của prop
                propListName += $"{propname},";
                propListValue += $"@{propname},";
                parameters.Add($"@{propname}", val);
            }
            propListName = propListName.Substring(0, propListName.Length - 1);
            propListValue = propListValue.Substring(0, propListValue.Length - 1);

            // Build câu lệnh sql
            var sqlInsert = $"INSERT {className}({propListName}) VALUES ({propListValue});";
            // thực thi
            var res = _connection.Execute(sqlInsert, parameters);
            return res;
        }

        public int Update(Employee entity)
        {
            var className = "Employee";
            var setClause = "";
            var keyPropertyName = className + "Id";
            var keyPropertyValue = "";

            // lấy ra tất cả các props của entity
            var props = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();

            // duyệt từng props
            foreach (var prop in props)
            {
                // lấy ra tên của prop
                var propname = prop.Name;
                var val = prop.GetValue(entity);
                if (propname == keyPropertyName)
                {
                    keyPropertyValue = val?.ToString() ?? "";
                }

                // xây dựng SET clause, bỏ qua khóa chính
                if (propname != keyPropertyName)
                {
                    setClause += $"{propname} = @{propname}, ";
                    parameters.Add($"@{propname}", val);
                }
            }

            // loại bỏ dấu phẩy và khoảng trắng cuối cùng
            setClause = setClause.Substring(0, setClause.Length - 2);

            // thêm khóa chính vào parameters
            parameters.Add($"@{keyPropertyName}", keyPropertyValue);

            // Build câu lệnh sql
            var sqlUpdate = $"UPDATE {className} SET {setClause} WHERE {keyPropertyName} = @{keyPropertyName};";

            // thực thi
            var res = _connection.Execute(sqlUpdate, parameters);
            return res;
        }
    }
}
