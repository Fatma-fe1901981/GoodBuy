package gui;

public class Algorithms {


	
	
	//1
	public static double linearSearchEquality (int blockNo) {
		//for an equality condition on a key attribute
		return (double)blockNo/2.00;
		}
	//2
	public static double primaryIndexEquality(int blevel, double selectivity) {
		//for equality only (to retrieve one value)
		return (double)blevel * selectivity + 1;
	}
	//3
	public static int hash(){
		//for one record
		return 1;
	}
	//4
	public static double secondaryIndexEquality (int recordsNo, double selectivity) {
		//for equality
		return ((double)recordsNo*selectivity)+1+((double)recordsNo*selectivity);
	}
	//5
	public static double binarySearchEqualityKey(int blockNo) {
    	double cost = (double)Math.log(blockNo) /(double) Math.log(2) ;
    	return cost;
    }
	//6
    // Binary search function
	public static double binarySearch(int blockNo, double selectivity ,int recordsNo) {
		double bfr = (double)recordsNo/blockNo;
    	double cost = (double)Math.log(blockNo) / Math.log(2) + ((recordsNo*selectivity) / bfr) - 1;
    	return cost;
    }
	//7
	public static int linearSearchRange (int blockNo) {
		
	return blockNo;
	}
	//8
	public static double orderingIndexRange(int blockNo, int blevel, double selectivity) {
		//multiple records 
		return (double)blevel*selectivity +(blockNo/2);
	}
	//9
    // Clustering Index to retrieve multiple records
	public static double clusteringIndexRange(double selectivity , int blockNo , int blevel,int recordsNo) {
		double cardinality = recordsNo*selectivity;
		double bfr = (double)recordsNo/blockNo;
		double cost =(double) blevel+((cardinality)/bfr);
    	return cost;
    }
	//10
	public static String secondaryIndexRange (int recordsNo, double selectivity, int blevel ) {
		return (double) (blevel)+(recordsNo/2)+"+ (bl1)/2";
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //11
	// Nested loop join function
	//assumption = we dont write to disk 
	//nb = 77 because blocks -77 so pages =77
	public static double Nested_loop_join(int blocksNoOuter, int blockNoInner) {
        double cost = blocksNoOuter + (Math.ceil((double) blocksNoOuter / (77 - 2)) * blockNoInner);
        return cost;
    }
    //12
	//cardinality of B of S
    // Indexed Nested loop join function
	public static double Indexed_Nested_loop_join(int blocksNoOuter, int recordNOR, int blevelB, double selectivityB) {
       double cardinality = recordNOR*selectivityB;
		double cost = blocksNoOuter + (recordNOR * (blevelB + 1 + cardinality));
        return cost;
    }
}
