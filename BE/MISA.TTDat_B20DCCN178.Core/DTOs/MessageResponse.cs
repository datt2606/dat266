using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.TTDat_B20DCCN178.Core.DTOs
{
    public class MessageResponse
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public List<String> Errors { get; set; } = new List<string>();
    }
}
