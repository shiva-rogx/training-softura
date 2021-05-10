using System;
using System.Collections.Generic;
using System.Text;

namespace Test3_App
{
    class Div7
    {
        static void DivideBySeven()
        {
            int num, sum = 0;
            do
            {
                Console.WriteLine("Enter the number=");
                num = Convert.ToInt32(Console.ReadLine());
                sum += num;
                if (sum % 7 == 0)
                {
                    Console.WriteLine("The entered number is divisible by 7. The number is" + sum);
                }


            }
            while (num > 0);
        }
    }
}


