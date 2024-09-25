namespace TodoListProject.Business.Models
{
    public class TaskItemFilter
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Created { get; set; }

        public TaskItemFilter() { }

        public TaskItemFilter(string title = "", string description = "", string created = "")
        {
            this.Title = title;
            this.Description = description;
            this.Created = string.IsNullOrEmpty(created) ? (DateTime?)null : DateTime.Parse(created);
        }
    }
}
