using Microsoft.AspNetCore.Mvc;
using TodoListProject.Business.Interfaces;
using TodoListProject.Business.Models;

namespace TodoListProject.Server.Controllers
{
    [ApiController]
    [Route("/api/tasks")]
    public class TaskItemsController : Controller
    {
        private readonly IRepository<TaskItem, TaskItemFilter> _taskItemsRepository;

        public TaskItemsController(IRepository<TaskItem, TaskItemFilter> taskItemsRepositoy)
        {
            _taskItemsRepository = taskItemsRepositoy;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll([FromQuery] TaskItemFilter filters)
        {
            var taskItems = await _taskItemsRepository.GetAll(filters);
            if (taskItems == null || !taskItems.Any())
            {
                return NoContent();
            }
            return Ok(taskItems);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TaskItem>> GetById(int id)
        {
            var taskItem = await _taskItemsRepository.GetById(id);

            if (taskItem == null)
            {
                return NotFound($"Task with id {id} was not found.");
            }

            return Ok(taskItem);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TaskItem>> Create([FromBody] TaskItem taskItem)
        {
            if (taskItem == null)
            {
                return BadRequest("Task should not be null");
            } 
            else if (string.IsNullOrWhiteSpace(taskItem.Title))
            {
                return BadRequest("Title should not be null or empty");
            }
            else if (string.IsNullOrWhiteSpace(taskItem.Description))
            {
                return BadRequest("Description should not be null or empty");
            }
            try
            {
                await _taskItemsRepository.Add(taskItem);
                return CreatedAtAction(nameof(GetById), new { id = taskItem.Id},taskItem);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while creating the task: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TaskItem>> Update(int id, TaskItem taskItem)
        {
            if (taskItem == null)
            {
                return BadRequest("Task cannot be null.");
            }
            else if (string.IsNullOrWhiteSpace(taskItem.Title))
            {
                return BadRequest("Title should not be null or empty");
            }
            else if (string.IsNullOrWhiteSpace(taskItem.Description))
            {
                return BadRequest("Description should not be null or empty");
            }


            try
            {
                if (!NoteExists(id))
                {
                    return NotFound($"Task with id {id} was not found.");
                }

                var updatedNote = await _taskItemsRepository.Update(id, taskItem);
                return Ok(updatedNote);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating the task: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {

            if (!NoteExists(id))
            {
                return NotFound($"Task with id {id} was not found.");
            }

            try
            {
                var result = await _taskItemsRepository.Delete(id);
                if (result > 0)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest($"An error occurred while deleting the task with id {id}.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the task: {ex.Message}");
            }
        }

        private bool NoteExists(int id)
        {
            return _taskItemsRepository.GetById(id).Result != null;
        }
    }
}
