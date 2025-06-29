namespace Domain.Interfaces;

public interface IRepository<TEntity> where TEntity : class
{
    IQueryable<TEntity> GetAll();
    IQueryable<TEntity> Filter(IQueryable<TEntity>queryable, string property, string? filter);
    IQueryable<TEntity> Filter(IQueryable<TEntity>queryable, string property, DateTime? filter);

    void SaveChanges();
    Task AddAsync(TEntity user);
    TEntity? GetById(Guid id);
    void Update(TEntity existingMatch);



}