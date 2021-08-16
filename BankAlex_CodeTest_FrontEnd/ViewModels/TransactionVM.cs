using BankAlex_CodeTest_FrontEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAlex_CodeTest_FrontEnd.ViewModels
{
    public class TransactionVM
    {
        public Guid Id { get; set; }
        public string FromAccount { get; set; }
        public string ToAccount { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Date { get; set; }
        public string Owner { get; set; }

        public static TransactionVM GetVM(Transaction transaction)
        {
            return new TransactionVM()
            {
                Id = transaction.Id,
                FromAccount = transaction.FromAccount,
                ToAccount = transaction.ToAccount,
                Description = transaction.Description,
                Amount = transaction.Amount,
                Date = transaction.Date.ToString(),
                Owner = transaction.Owner.Name
            };
        }
    }
}
