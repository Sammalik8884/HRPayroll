using Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Exceptions
{
    public class DomainException : Exception
    {
        public DomainException(string message) : base(message) { }

    }
    public class ValidationException : DomainException
    {
        public List<string> Errors { get; set; } = new();
        public ValidationException(string message, List<string> errors) : base("One or more validation errors occurred.")
        {
            Errors = errors;
        }
    }
    public class UnauthorizedException : DomainException
    {
        public UnauthorizedException(string message) : base(message) { }
    }
}
public class NotFoundException : DomainException
{
    public NotFoundException(string message) : base(message) { }

    public NotFoundException(string name, object key)
        : base($"{name} with id '{key}' was not found.") { }
}
