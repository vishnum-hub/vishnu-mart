import java.util.Scanner;

public class VishnuMart {

    static Scanner sc = new Scanner(System.in);

    // Account details
    static String registeredEmail = "";
    static String registeredPassword = "";
    static String registeredRole = "";

    // ================= CREATE ACCOUNT =================
    public static void createAccount() {

        System.out.println("\n================================");
        System.out.println("        CREATE ACCOUNT");
        System.out.println("================================");

        System.out.print("Enter Email: ");
        registeredEmail = sc.nextLine();

        System.out.print("Create Password: ");
        registeredPassword = sc.nextLine();

        System.out.print("Enter Role (Buyer/Seller): ");
        registeredRole = sc.nextLine();

        // Role validation
        if (!registeredRole.equalsIgnoreCase("Buyer") &&
            !registeredRole.equalsIgnoreCase("Seller")) {

            System.out.println("\nInvalid role!");
            System.out.println("Please enter Buyer or Seller.");
            registeredEmail = "";
            registeredPassword = "";
            registeredRole = "";
            return;
        }

        System.out.println("\nAccount created successfully!");
        System.out.println("Email: " + registeredEmail);
        System.out.println("Role: " + registeredRole);
    }


    // ================= LOGIN =================
    public static void login() {

        System.out.println("\n================================");
        System.out.println("             LOGIN");
        System.out.println("================================");

        if (registeredEmail.isEmpty()) {
            System.out.println("No account found!");
            System.out.println("Please create an account first.");
            return;
        }

        System.out.print("Enter Email: ");
        String email = sc.nextLine();

        System.out.print("Enter Password: ");
        String password = sc.nextLine();

        System.out.print("Enter Role (Buyer/Seller/Admin): ");
        String role = sc.nextLine();

        // Admin login
        if (email.equals("admin@vishnumart.com") &&
            password.equals("admin123") &&
            role.equalsIgnoreCase("Admin")) {

            System.out.println("\nAdmin Login Successful!");
            adminModule();
        }

        // Buyer/Seller login
        else if (email.equals(registeredEmail) &&
                 password.equals(registeredPassword) &&
                 role.equalsIgnoreCase(registeredRole)) {

            System.out.println("\nLogin Successful!");

            if (role.equalsIgnoreCase("Buyer")) {
                buyerModule();
            }

            else if (role.equalsIgnoreCase("Seller")) {
                sellerModule();
            }
        }

        else {
            System.out.println("\nInvalid Email, Password, or Role!");
            System.out.println("Login Failed.");
        }
    }


    // ================= BUYER MODULE =================
    public static void buyerModule() {

        while (true) {

            System.out.println("\n================================");
            System.out.println("          BUYER MODULE");
            System.out.println("================================");

            System.out.println("1. View Products");
            System.out.println("2. Buy Product");
            System.out.println("3. View Orders");
            System.out.println("4. Logout");

            System.out.print("Enter your choice: ");
            int choice = Integer.parseInt(sc.nextLine());

            switch (choice) {

                case 1:
                    System.out.println("\nDisplaying Products...");
                    break;

                case 2:
                    System.out.println("\nProduct Purchase Section");
                    break;

                case 3:
                    System.out.println("\nYour Orders");
                    break;

                case 4:
                    System.out.println("\nBuyer Logged Out Successfully!");
                    return;

                default:
                    System.out.println("\nInvalid choice!");
            }
        }
    }


    // ================= SELLER MODULE =================
    public static void sellerModule() {

        while (true) {

            System.out.println("\n================================");
            System.out.println("          SELLER MODULE");
            System.out.println("================================");

            System.out.println("1. Add Product");
            System.out.println("2. View Products");
            System.out.println("3. Update Product");
            System.out.println("4. Delete Product");
            System.out.println("5. Logout");

            System.out.print("Enter your choice: ");
            int choice = Integer.parseInt(sc.nextLine());

            switch (choice) {

                case 1:
                    System.out.println("\nAdd Product Section");
                    break;

                case 2:
                    System.out.println("\nView Products Section");
                    break;

                case 3:
                    System.out.println("\nUpdate Product Section");
                    break;

                case 4:
                    System.out.println("\nDelete Product Section");
                    break;

                case 5:
                    System.out.println("\nSeller Logged Out Successfully!");
                    return;

                default:
                    System.out.println("\nInvalid choice!");
            }
        }
    }


    // ================= ADMIN MODULE =================
    public static void adminModule() {

        while (true) {

            System.out.println("\n================================");
            System.out.println("          ADMIN MODULE");
            System.out.println("================================");

            System.out.println("1. Manage Buyers");
            System.out.println("2. Manage Sellers");
            System.out.println("3. Manage Products");
            System.out.println("4. View Reports");
            System.out.println("5. Logout");

            System.out.print("Enter your choice: ");
            int choice = Integer.parseInt(sc.nextLine());

            switch (choice) {

                case 1:
                    System.out.println("\nManaging Buyers...");
                    break;

                case 2:
                    System.out.println("\nManaging Sellers...");
                    break;

                case 3:
                    System.out.println("\nManaging Products...");
                    break;

                case 4:
                    System.out.println("\nDisplaying Reports...");
                    break;

                case 5:
                    System.out.println("\nAdmin Logged Out Successfully!");
                    return;

                default:
                    System.out.println("\nInvalid choice!");
            }
        }
    }


    // ================= MAIN =================
    public static void main(String[] args) {

        while (true) {

            System.out.println("\n================================");
            System.out.println("        WELCOME TO VISHNUMART");
            System.out.println("================================");

            System.out.println("1. Create Account");
            System.out.println("2. Login");
            System.out.println("3. Exit");

            System.out.print("Enter your choice: ");
            int choice = Integer.parseInt(sc.nextLine());

            switch (choice) {

                case 1:
                    createAccount();
                    break;

                case 2:
                    login();
                    break;

                case 3:
                    System.out.println("\nThank you for using VishnuMart!");
                    sc.close();
                    return;

                default:
                    System.out.println("\nInvalid choice!");
                    System.out.println("Please select 1, 2, or 3.");
            }
        }
    }
}