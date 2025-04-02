using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;

namespace ProjetoChallenge.Extensions; // Adicione o namespace correto

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
    {
        var assembly = Assembly.GetEntryAssembly();

        if (assembly != null)
        {
            var serviceTypes = assembly.GetTypes()
                .Where(t => t.Name.EndsWith("Service") && !t.IsInterface && !t.IsAbstract);

            foreach (var serviceType in serviceTypes)
            {
                var interfaceType = serviceType.GetInterfaces().FirstOrDefault(i => i.Name == $"I{serviceType.Name}");

                if (interfaceType != null)
                {
                    services.AddScoped(interfaceType, serviceType);
                }
                else
                {
                    services.AddScoped(serviceType);
                }
            }
        }

        return services;
    }
}