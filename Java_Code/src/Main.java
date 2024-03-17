import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) throws SQLException {
		// TODO Auto-generated method stub
		Connection conn = 
				DriverManager.getConnection("jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa", "ss2004852", "ss2004852");
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery("select ename, empno, sal from emp");
		while (rs.next()) {
			String name = rs.getString("ename");
			//column 1
			//column "ename"
			int no = rs.getInt(2);
			//column 2
			double salary = rs.getDouble(3);
			System.out.println(name+ " "+no+" "+salary);
		}
		
		
	}

    // Binary search function
    private static double binarySearch(int b, int s , int bfr) {
    	double cost = Math.log(b) / Math.log(2) + (s / bfr) - 1;
    	return cost;
    }	
    // Clustring Index to retrieve muilty records 
    private static double clusteringIndexMuiltyRecord(int s , int bfr , int x) {
    	double cost = x+(s/bfr);
    	return cost;
    	
    }
}
