package gui;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class TestTerminal {
	public static void main(String[] args) throws SQLException {
		System.out.println("Welcome to Query Analyzer and Cost Estimator");
		System.out.println("____________________________________________");
		int option;
		boolean primary = false;

		String finalQuery = "";

		do {
			System.out.println("\nPlease enter the number of your request of the following services:");
			System.out
					.println("\n\t1- View Metadata" + "\n\t2- Select Quering" + "\n\t3- Join Quering" + "\n\t4- EXIT");
			Scanner first = new Scanner(System.in);
			option = first.nextInt();

			switch (option) {

			case 1:
				System.out.println("To view the metadata, please run the \"Metadata.java\" file.");
				System.out.println("____________________________________________________________\n\n\n");
				break;
			case 2:
				System.out.println("From which table do you want to select?");
				System.out.println("\n\t- AIRPLANE" + "\n\t- AIRPLANE_TYPE");
				Scanner second = new Scanner(System.in);
				String table = second.next();
				String atrributeSelected;
				System.out.println("\nWhich Attribute?");
				if (table.equals("AIRPLANE") || table.equals("airplane") || table.equals("Airplane")) {
					System.out.println("\n\t- Airplane_ID" + "\n\t- Total_Number_of_Avail_Seats" + "\n\t- Type_Name");
					Scanner attribute = new Scanner(System.in);
					atrributeSelected = attribute.next();
					if (atrributeSelected.equalsIgnoreCase("Airplane_ID"))
						primary = true;
					else
						primary = false;

				} else {
					System.out.println("\n\t- Type_Name" + "\n\t- Company" + "\n\t- Max_Seats");
					Scanner attribute = new Scanner(System.in);
					atrributeSelected = attribute.next();
					if (atrributeSelected.equalsIgnoreCase("Type_Name"))
						primary = true;
					else
						primary = false;
				}

				System.out.println("\nSelect an operation from the following: ");
				System.out.println("\n\t- =" + "\n\t- >" + "\n\t- <" + "\n\t- <=" + "\n\t- >=" + "\n\t- LIKE");
				Scanner operationType = new Scanner(System.in);
				String operation = operationType.next();

				System.out.println("\nEnter the value for your condition: ");
				Scanner conditionText = new Scanner(System.in);
				String condition = conditionText.next();

				finalQuery = "select * from " + table + " where " + atrributeSelected + " " + operation + " "
						+ condition;
				System.out.println("\nHere is your Query: ");
				System.out.println(finalQuery);

				// equality
				if (operation.equals("=")) {

					// option 1
					int blocksNo = 0;
					int recordsNo = 0;
					double selectivity = 0.000;
					if (primary) {
						Connection connection = DriverManager.getConnection(
								"jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa", "fm1706475", "fm1706475");
						Statement statement = connection.createStatement();
						ResultSet result = statement
								.executeQuery("select blocksNo, recordsNo  from tableMetadata where tablename like '"
										+ table.toUpperCase() + "'");
						while (result.next()) {
							blocksNo = result.getInt(1);
							recordsNo = result.getInt(2);
						}
						ResultSet result2 = statement.executeQuery(
								"Select selectivity from columnMetadata where TABLENAME = '" + table.toUpperCase() + "'"
										+ " AND columNname ='" + atrributeSelected.toUpperCase() + "'");
						while (result2.next()) {
							selectivity = result2.getDouble(1);

						}
//							System.out.println(blocksNo);
//							System.out.println(recordsNo);
//							System.out.println(selectivity);
						double cost1 = Algorithms.linearSearchEquality(blocksNo);
						System.out.println("Cost of the Linear Search: " + cost1);
						// option 2
						double cost2 = Algorithms.secondaryIndexEquality(recordsNo, selectivity);
						System.out.println("Cost of the Secondary Index: " + cost2);

						double cost3 = Algorithms.binarySearchEqualityKey(blocksNo);
						System.out.printf("Cost of the Binary Search on Key: %f3", cost3);

						double minCost1 = Math.min(cost1, cost2);
						double finalCost = Math.min(cost3, minCost1);
						System.out.println("\n The lowest cost is: " + finalCost);
					} else {

						double cost1 = Algorithms.secondaryIndexEquality(recordsNo, selectivity);
						System.out.println("Cost of the Secondary Index: " + cost1);

						double cost2 = Algorithms.binarySearch(blocksNo, selectivity, recordsNo);
						System.out.println("Cost of the Binary Search: " + cost2);
						System.out.println(cost2);
						double finalCost = Math.min(cost1, cost2);
						System.out.println("\n The lowest cost is: " + finalCost);
					}
				}
				// range
				else {
					int blocksNo = 0;
					int recordsNo = 0;
					double selectivity = 0.000;
					int blevel = 0;
					Connection connection = DriverManager.getConnection(
							"jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa", "fm1706475", "fm1706475");
					Statement statement = connection.createStatement();
					ResultSet result = statement
							.executeQuery("select blocksNo, recordsNo  from tableMetadata where tablename like '"
									+ table.toUpperCase() + "'");
					while (result.next()) {
						blocksNo = result.getInt("blocksNo");
						recordsNo = result.getInt("recordsNo");
					}
					ResultSet result2 = statement.executeQuery(
							"Select selectivity from columnMetadata where TABLENAME = '" + table.toUpperCase() + "'"
									+ " AND columnName ='" + atrributeSelected.toUpperCase() + "'");
					while (result2.next()) {
						selectivity = result2.getDouble("selectivity");
					}
					ResultSet result3 = statement.executeQuery(
							"Select blevel from IndexMetaData where TABLENAME = '" + table.toUpperCase() + "'");
					while (result3.next()) {
						blevel = result3.getInt("blevel");
					}
					// option 1
					double cost1 = Algorithms.linearSearchRange(blocksNo);
					System.out.println("Cost of the linear Search: " + cost1);
					// option 2
					double cost2 = Algorithms.binarySearch(blocksNo, selectivity, recordsNo);
					System.out.println("Cost of the Binary Search: " + cost2);
					// option 3
					double cost3 = Algorithms.orderingIndexRange(blocksNo, recordsNo, selectivity);
					System.out.println("Cost of the Ordering Index: " + cost3);
					// option 4
					String cost4 = Algorithms.secondaryIndexRange(recordsNo, selectivity, blevel);
					System.out.println("Cost of the Secondary Index: " + cost4);

					double cost5 = Algorithms.clusteringIndexRange(selectivity, blocksNo, blevel, recordsNo);
					System.out.printf("Cost of the Clustering Index: %f3 \n", cost5);

					double minCost1 = Math.min(cost1, cost2);
					double minCost2 = Math.min(cost3, cost5);
					double finalCost = Math.min(minCost1, minCost2);
					System.out.printf("\nThe lowest cost is: %f3 ", finalCost);
				}
				break;
			case 3:
				String primkey = null;
				String forkey = null;
				int blockNoAirplane = 0;
				int blockNoAirplane_type = 0;
				int recordsNo = 0;
				double selectivity = 0.000;
				int blevel = 0;
				System.out.println("We will be joining both tables together using equi-join");
				Connection connection = DriverManager.getConnection(
						"jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa", "fm1706475", "fm1706475");
				Statement statement = connection.createStatement();
				ResultSet result = statement.executeQuery("select primkey from tableMetadata");
				while (result.next()) {
					primkey = result.getString("primkey");
					forkey = result.getString("primkey");
				}
				ResultSet result1 = statement.executeQuery(
						"select blocksNo, recordsNo from tableMetadata where tablename like 'AIRPLANE_TYPE'");
				while (result1.next()) {
					recordsNo = result1.getInt("recordsNo");
					blockNoAirplane_type = result1.getInt("blocksNo");
				}
				ResultSet result2 = statement.executeQuery(
						"Select selectivity from columnMetadata where TABLENAME = 'AIRPLANE' AND columNname ='TYPE_NAME'");
				while (result2.next()) {
					selectivity = result2.getDouble("selectivity");

				}
				ResultSet result3 = statement
						.executeQuery("Select blevel from IndexMetaData where TABLENAME = 'AIRPLANE'");
				while (result3.next()) {
					blevel = result3.getInt("blevel");
				}

				ResultSet result4 = statement
						.executeQuery("select blocksNo from tableMetadata where tablename = 'AIRPLANE'");
				while (result4.next()) {
					blockNoAirplane = result4.getInt("blocksNo");
				}

				System.out.println("\nHere is your Query: ");
				System.out.println(
						"select AIRPLANE_TYPE.Type_Name, AIRPLANE_TYPE.Company, AIRPLANE_TYPE.Max_Seats, AIRPLANE.Airplane_ID, AIRPLANE.Total_Number_of_Avail_Seats from AIRPLANE, AIRPLANE_TYPE where AIRPLANE.Type_Name = AIRPLANE_TYPE.Type_Name"
								+ "\n");

				double cost1 = Algorithms.Nested_loop_join(blockNoAirplane_type, blockNoAirplane);

				System.out.println("Cost of the Nested Loop: " + cost1);

				double cost2 = Algorithms.Indexed_Nested_loop_join(blockNoAirplane_type, recordsNo, blevel,
						selectivity);
				System.out.println("Cost of the Secondary Index: " + cost2);

				double finalCost = Math.min(cost1, cost2);
				System.out.println("\nThe lowest cost is: " + finalCost);

				break;
			case 4:
				System.out.close();
				break;
			default:
				System.out.println("\nWRONG CHOICE!\nTRY AGAIN!\n");
				break;
			}
		} while (option != 4);

	}
}
