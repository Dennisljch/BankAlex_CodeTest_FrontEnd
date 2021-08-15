using BankAlex_CodeTest_FrontEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAlex_CodeTest_FrontEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            Transaction transaction1 = new Transaction()
            {
                Id = new Guid("6976fe63-c665-445b-835c-42dabe9fa3b7"),
                FromAccount = "123-456",
                ToAccount = "789-123",
                Description = "Sample transaction description",
                Amount = 123001.8,
                Date = DateTime.Now,
                Owner = new Customer()
                {
                    Id = new Guid("6976fe63-c665-445b-835c-42dabe9fa3b6"),
                    Name = "Jane Smith"
                }
            };

            Transaction transaction2 = new Transaction()
            {
                Id = new Guid("6976fe63-c665-445b-835c-42dabe9fa3b8"),
                FromAccount = "199-456",
                ToAccount = "709-123",
                Description = "Sample transaction description",
                Amount = 123001.8,
                Date = DateTime.Now,
                Owner = new Customer()
                {
                    Id = new Guid("6976fe63-c665-445b-835c-42dabe9fa3b9"),
                    Name = "Alex Smith"
                }
            };

            List<Transaction> transactions = new List<Transaction>();
            transactions.Add(transaction1);
            transactions.Add(transaction2);

            return Ok(transactions);
        }


        [HttpPost]
        public IActionResult Post(Transaction transaction)
        {
            try
            {
                return Ok("transaction created");
            }
            catch
            {
                return BadRequest("validation errors");
            }
        }


        [HttpPut("{id:guid}")]
        public IActionResult Put(Guid id, Transaction transaction)
        {
            try
            {
                return Ok("transaction updated");
            }
            catch
            {
                return BadRequest("validation errors");
            }
        }
        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id, Transaction transaction)
        {
            try
            {
                return Ok("transaction updated");
            }
            catch
            {
                return BadRequest("validation errors");
            }
        }
    }
}
