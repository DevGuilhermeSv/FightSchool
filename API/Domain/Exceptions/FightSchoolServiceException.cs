namespace Domain;

public class FightSchoolServiceException : Exception
{
    public FightSchoolServiceException() { }
    public FightSchoolServiceException(string message) : base(message) { }
    public FightSchoolServiceException(string message, Exception inner) : base(message, inner) { }
}