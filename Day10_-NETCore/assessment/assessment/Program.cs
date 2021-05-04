using System;

namespace assessment
{
    class Program
    {
        static void Calculator()
        {
            Console.WriteLine("Please enter a integer 1");
            int num1 = Convert.ToInt32(Console.ReadLine()); //explicit conversion
            Console.WriteLine("Please enter a integer 2");
            int num2 = Convert.ToInt32(Console.ReadLine()); //explicit conversion
            string operand;
            Console.Write("Please enter an operand [ +, -, *, / ]: ");
            operand = Console.ReadLine();

            switch (operand)
            {
                case "+":
                    int sum = num1 + num2;
                    Console.WriteLine("The sum = " + sum);
                    break;
                case "-":
                    int sub = num1 - num2;
                    Console.WriteLine("The sub = " + sub);
                    break;
                case "*":
                    float product = num1 * num2;
                    Console.WriteLine("The product = " + product);

                    break;
                case "/":
                    float fnum1 = num1;
                    float fnum2 = num2;
                    float div = fnum1 / fnum2;
                    Console.WriteLine("The div = " + div);

                    break;

                default:
                    Console.WriteLine("Please enter a valid option :(");
                    break;
            }


        }

        static void PrimeOrNot()
        {

        }

         static void Main(string[] args)
            {


                Calculator();
            }
        
    }
}
