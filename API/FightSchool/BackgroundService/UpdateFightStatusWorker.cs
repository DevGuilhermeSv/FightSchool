using Application.Interfaces;

namespace FightSchool.BackgroundService;

public class UpdateFightStatusWorker : Microsoft.Extensions.Hosting.BackgroundService
{
    private readonly ILogger<UpdateFightStatusWorker> _logger;
    private readonly IServiceProvider _serviceProvider;

    public UpdateFightStatusWorker(ILogger<UpdateFightStatusWorker> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            
            var now = DateTime.Now;
            var nextRun = now.Date.AddDays(1).AddMinutes(1);

            var delay = nextRun - now;

            _logger.LogInformation("Próxima execução em {time}", nextRun);

            try
            {
                await Task.Delay(delay, stoppingToken); // espera até 00:01h
            }
            catch (TaskCanceledException)
            {
                return; 
            }

            using (var scope = _serviceProvider.CreateScope())
            {
               var matchService = scope.ServiceProvider.GetService<IMatchService>();
               await matchService!.UpdateExpiredMatchAsync();
            }

            _logger.LogInformation("Atualização de lutas expiradas executada em: {time}", DateTimeOffset.Now);
        }
    }

   
}