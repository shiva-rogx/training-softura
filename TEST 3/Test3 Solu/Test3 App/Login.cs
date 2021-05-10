using System;
using System.Collections.Generic;
using System.Text;

namespace Test3_App
{
    public class Login
    {
        public static void Main()
        {
            string username, password;
            int ctr = 0;
            Console.Write("Login Here\n");
            Console.Write("username and password is :Admin and admin\n");
            Console.Write("------------------------------------------------------\n");

            do
            {
                Console.Write("Enter your sername: ");
                username = Console.ReadLine();

                Console.Write("Enter Your password: ");
                password = Console.ReadLine();

                if (username != "Ramu" || password != "1234")
                    ctr++;
                else
                    ctr = 1;

            }
            while ((username != "Admin" || password != "1234") && (ctr != 3));

            if (ctr == 3)
                Console.Write("Invalid username or password, Sorry you have already tried 3 times");
            else
                Console.Write("Welcome!!");
        }
    }

}

    