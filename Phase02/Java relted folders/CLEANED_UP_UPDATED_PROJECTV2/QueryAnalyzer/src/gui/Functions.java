package gui;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Functions {
	public static void main(String[] args) throws SQLException {
		// TODO Auto-generated method stub
		Connection conn = 
				DriverManager.getConnection("jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa", "fm1706475", "fm1706475");
        // Add any logic related to the main method if needed

	}

    // Binary search function
	public static double binarySearch(int b, int s , int bfr) {
    	double cost = Math.log(b) / Math.log(2) + (s / bfr) - 1;
    	return cost;
    }	
    // Clustering Index to retrieve multiple records
	public static double clusteringIndexMultiRecord(int s , int bfr , int x) {
    	double cost = x+(s/bfr);
    	return cost;
    	
    }
	
    // Nested loop join function
	public static double Nested_loop_join(int br, int bs, int nb, int bfrrs, int s, int r, int js) {
        double cost = br + (Math.ceil((double) br / (nb - 2)) * bs)+((js * Math.abs(r) * Math.abs(s)) / bfrrs);
        return cost;
    }
    
    // Indexed Nested loop join function
	public static double Indexed_Nested_loop_join(double be, int r, int xb, int sb, int bfrrs, int s, int js) {
        double cost = be + (Math.abs(r) * (xb + 1 + sb))+((js * Math.abs(r) * Math.abs(s)) / bfrrs);
        return cost;
    }
	
	public int linearSearchRange (int blockNo) {
		
		return blockNo;
	}
	public int linearSearchEquality (int blockNo) {
			//for an equality condition on a key attribute
			return blockNo/2;
	}
	public double orderingIndex(int blockNo, int recordsNo, double selectivity) {
			//multiple records 
			return (double)recordsNo*selectivity +(blockNo/2);
		}
	// insert clustering here
		public double secondaryIndexEquality (int recordsNo, double selectivity) {
			//for equality
			return (double)(recordsNo*selectivity)+1+(recordsNo*selectivity);
		}
		public double secondaryIndexRange (int recordsNo, double selectivity ) {
			return (double) (recordsNo*selectivity)+(recordsNo/2);
		}

}
