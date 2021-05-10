using System;
using System.Collections.Generic;
using System.Text;

namespace Test3_App
{
    class PrintPositive
    {
    static void Main()
    {
        int i;
        int[] a = new int[30];  
        Console.Write("Enter the Number of values to be Sort : ");
        int n = Convert.ToInt16(Console.ReadLine());
         for (i = 1; i <= n; i++)
        {
            Console.Write("Enter the No " + i + ":");
             a[i] = Convert.ToInt16(Console.ReadLine());
        }
        for (i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - 1; j++)
            {
                if (a[j] > a[j + 1])
                {
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
        }
        Console.Write("Ascending Sort : ");
        for (i = 1; i <= n; i++)
        {
            Console.Write(a[i] + " ");
        }
    
        Console.ReadKey();
    }
}