using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Api.Models;
using Voter.Api.Services;

namespace Voter.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly QuestionService _questionService;

        public QuestionsController(QuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet]
        public ActionResult<List<Question>> Get() =>
            _questionService.Get();

        [HttpGet("{id:length(24)}", Name = "GetQuestion")]
        public ActionResult<Question> Get(string id)
        {
            var question = _questionService.Get(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        [HttpPost]
        public ActionResult<Question> Create(Question question)
        {
            _questionService.Create(question);

            return CreatedAtRoute("GetQuestion", new { id = question.Id.ToString() }, question);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Vote vote)
        {
            if (vote.Yes == 0 && vote.No == 0)
                return new ObjectResult("Invalid vote.")
                {
                    StatusCode = 412
                };

            var question = _questionService.Get(id);

            if (question == null)
            {
                return NotFound();
            }

            if (vote.Yes > 0)
                question.Yes++;
            else if (vote.No > 0)
                question.No++;

            _questionService.Update(id, question);

            return NoContent();
        }
    }
}
