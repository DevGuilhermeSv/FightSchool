using Domain.Interfaces;
using Infrastructure.DbContext;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class BaseRepository<T> : IRepository<T> where T : class
{
    private readonly AppDbContext _context;
    public DbSet<T> DbSet;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
        DbSet = context.Set<T>();
    }

    public IQueryable<T> GetAll()
    {
        return DbSet;
    }

    public IQueryable<T> 
        Filter(IQueryable<T> queryable, string property, string? filter)
    {
        if (string.IsNullOrEmpty(filter))
        {
            return queryable;
        }

        return queryable.Filter(property, filter);
    }

    public IQueryable<T> Filter(IQueryable<T> queryable, string property, DateTime? filter)
    {
        return filter is null ? queryable : queryable.FilterDate(property, filter);
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }

    public Task AddAsync(T user)
    {
        DbSet.Add(user);
        return Task.CompletedTask;
    }

    public T? GetById(Guid id)
    {
        return DbSet.Find(id);
    }

    public void Update(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
    }
}