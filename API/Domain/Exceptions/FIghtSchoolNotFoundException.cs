using System.Runtime.Serialization;

namespace Domain.Exceptions;

public class FightSchoolNotFoundException : Exception
{
    public FightSchoolNotFoundException()
    {
    }

    protected FightSchoolNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public FightSchoolNotFoundException(string? message) : base(message)
    {
    }

    public FightSchoolNotFoundException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}