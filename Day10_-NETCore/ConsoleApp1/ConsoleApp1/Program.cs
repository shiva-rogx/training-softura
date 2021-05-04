using System;

namespace ConsoleApp1
{
    class Program
    {

        static void CheckTheDay()
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
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(i);
            }
            Console.WriteLine("For loop end");
        }

        static void loops()
        {
            int flag = -1, sum = 0;
            do
            {
                Console.WriteLine("please enter a number ");
                flag = Convert.ToInt32(Console.ReadLine());
                //sum = sum + flag;
                sum += flag;
            }
            while (flag >= 0);
            {
                Console.WriteLine("Here we go... The sum is {0}", sum);
            }
        }

        static void UnderstandingErrorHandling()
        {
            int num = 0;
            Console.WriteLine("Please enter the number ");
            while (Int32.TryParse(Console.ReadLine(), out num);
            //num = Int32.Parse(Console.ReadLine());
            //bool check = Int32.TryParse(Console.ReadLine(), out num);
            Console.WriteLine("Invalid input. Please enter an integer");
            Console.WriteLine("The number is " + num);
        }

        static void Main(string[] args)
        {
            //CheckTheDay();
            //UnderstandingIteration();
            //loops();
            UnderstandingErrorHandling();
        }    
    }
}
