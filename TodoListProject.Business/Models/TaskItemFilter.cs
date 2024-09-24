using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoListProject.Business.Models
{
    public class TaskItemFilter
    {
        string Title { get; set; }
        string Description { get; set; }
        DateTime Created { get; set; }

        public TaskItemFilter(string title, string description, string created)
        {
            Title = title;
            Description = description;
            Created = DateTime.Parse(created);
        }
    }
}
