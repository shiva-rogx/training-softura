using System;

namespace Test3_App
{

    class Test3
    {
        public static void Main(string[] args)
        {
            int a, b, i, j, flag;
            Console.WriteLine("Enter Number One");
            a = int.Parse(Console.ReadLine());
            Console.WriteLine("Enter Number 2");

            b = int.Parse(Console.ReadLine());

            Console.WriteLine("\nPrime numbers are " + "{0} and {1} are: ", a, b);
            for (i = a; i <= b; i++)
            {
                if (i == 1 || i == 0)
                    continue;
                flag = 1;

                for (j = 2; j <= i / 2; ++j)
                {
                    if (i % j == 0)
                    {
                        flag = 0;
                        break;
                    }
                }
                if (flag == 1)
                    Console.WriteLine(i);
            }
        }
    }
}