using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Api.Models
{
    public class VoteDatabaseSettings : IVoteDatabaseSettings
    {
        public string QuestionsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
