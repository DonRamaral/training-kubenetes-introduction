using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Api.Models;

namespace Voter.Api.Services
{
    public class QuestionService
    {
        private readonly IMongoCollection<Question> _questions;

        public QuestionService(IVoteDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _questions = database.GetCollection<Question>(settings.QuestionsCollectionName);
        }

        public List<Question> Get() =>
            _questions.Find(book => true).ToList();

        public Question Get(string id) =>
            _questions.Find<Question>(question => question.Id == id).FirstOrDefault();

        public Question Create(Question question)
        {
            _questions.InsertOne(question);
            return question;
        }

        public void Update(string id, Question questionIn) =>
            _questions.ReplaceOne(qestion => qestion.Id == id, questionIn);
    }
}
