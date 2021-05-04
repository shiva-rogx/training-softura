using System;

namespace FirstConsoleApplication
{
    class Program
    {
        //static int num1, num2; // class level declaration
        static void FirstMethod()
        {
            //Console.WriteLine("Hello From My Method !");
            //Console.WriteLine("Am i visible there ?");
            Console.WriteLine("User please enter something");
            string data = Console.ReadLine();
            Console.WriteLine("User you entered " + data);
        }

        static void DealingNumbers()
        {
            Console.WriteLine("Please enter a integer 1");
            string number = Console.ReadLine();
            int num1 = Convert.ToInt32(number); //explicit conversion
            Console.WriteLine("Please enter a integer 2");
            int num2 = Convert.ToInt32(Console.ReadLine()); //explicit conversion
            int sum = num1 + num2;
            int sub = num1 - num2;
            float product = num1 * num2;
            decimal div = num1 / num2;
            Console.WriteLine("The sum = " + sum);
            Console.WriteLine("The sub = " + sub);
            Console.WriteLine("The product = " + product);
            Console.WriteLine("The div = " + div);
        }

        //static void TakeNumberFromUser()
        //{
        //    Console.WriteLine("Enter first integer : ");
        //    num1 = Convert.ToInt32(Console.ReadLine()); // unboxing : converting the ref type to value type
        //    Console.WriteLine("Enter second integer : ");
        //    num2 = Int32.Parse(Console.ReadLine());
        //}
        static void Calculate()
        {
            int num1, num2;
            Console.WriteLine("Enter first integer : ");
            num1 = Convert.ToInt32(Console.ReadLine()); // unboxing : converting the ref type to value type
            Console.WriteLine("Enter second integer : ");
            num2 = Int32.Parse(Console.ReadLine());
            Console.WriteLine("The numbers are " + num1 + " " + num2);
            int sum = num1 + num2;
            Console.WriteLine("The sum of {0} and {1} is {2}", num1, num2, sum);
        }

        //static void LargestNumber()
        //{
        //    TakeNumberFromUser();
        //    if (num1 > num2)
        //        Console.WriteLine("{0} is greater than {1}", num1, num2);
        //    else if (num1 < num2)
        //        Console.WriteLine("{0} is greater than {1}", num2, num1);
        //    else
        //        Console.WriteLine("{0} and {1} are equal", num1, num2);
                    
            
        }

        static void CheckDay()
        {
            Console.WriteLine("Enter a day ");
            string day = Console.ReadLine();
            switch (day)
            {
                case "monday":
                case "tuesday":
                case "wednesday":
                case "thursday":
                    Console.WriteLine(" Its a Weekday");
                    break;
                case "friday":
                    Console.WriteLine("Weekend on the way !");
                    break;
                case "saturday":
                case "sunday":
                    Console.WriteLine("Weekend...haffun !");
                        break;
                default:
                    Console.WriteLine("Please enter a valid day :( ");
                    break;
            }
        }

       static void UnderstandingIteration()
    {
        for(int i=0;i<10;i++)
        {
            Console.WriteLine(i);
        }
        Console.WriteLine("For loop end");
    }


        static void Main(string[] args)
        {  
            //LargestNumber();
            //Calculate();
            // DealingNumbers();
            //FirstMethod();
            //Console.WriteLine("Hello World!");
            CheckDay();
            
        }
    }
}
