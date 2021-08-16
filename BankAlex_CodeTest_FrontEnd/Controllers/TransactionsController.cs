using BankAlex_CodeTest_FrontEnd.Models;
using BankAlex_CodeTest_FrontEnd.ViewModels;
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
        [HttpGet("{id:guid?}")]
        public ActionResult Get(Guid id)
        {
            Transaction transaction1 = new Transaction()
            {
                Id = new Guid("6976fe63-c665-445b-835c-42dabe9fa3b7"),
                FromAccount = "123-456",
                ToAccount = "789-123",
                Description = "Sample transaction description",
                Amount = 123.8,
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

         

            if (id == Guid.Empty)
            {
                List<TransactionVM> transactionVMs 
                    = transactions.Select(s => TransactionVM.GetVM(s, false))
                                    .ToList();
                return Ok(transactionVMs);
            }
            else
            {
                var transaction
                    = transactions.Where(t => t.Id == id)
                                    .Select(s => TransactionVM.GetVM(s, true))
                                    .FirstOrDefault();
                return Ok(transaction);
            }
        }


        [HttpPost]
        public IActionResult Post(TransactionVM transaction)
        {
            try
            {
                int seconds = DateTime.Now.Second;
                if (seconds % 4 == 0)
                    return StatusCode(500);

                return Ok("transaction created");
            }
            catch
            {
                return StatusCode(500);
            }
        }


        [HttpPut("{id:guid}")]
        public IActionResult Put(Guid id, TransactionVM transaction)
        {
            try
            {
                int seconds = DateTime.Now.Second;
                if (seconds % 4 == 0)
                    return StatusCode(500);

                return Ok("transaction updated");
            }
            catch
            {
                return StatusCode(500);
            }
        }
        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                int seconds = DateTime.Now.Second;
                if(seconds % 4 == 0)
                    return StatusCode(500);

                return Ok("transaction delete");
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}
