package gui;

import java.sql.Connection;

import java.sql.DriverManager;

import java.sql.ResultSet;

import java.sql.SQLException;

import java.sql.Statement;

public class Test {

	public static void main(String[] args) throws SQLException {

		// TODO Auto-generated method stub

		Connection conn =

				DriverManager.getConnection("jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa", "fm1706475",
						"fm1706475");

		Statement stmt = conn.createStatement();

		ResultSet rs = stmt.executeQuery("select ename, empno, sal from emp");

		while (rs.next()) {

			String name = rs.getString("ename");

			// column 1

			// column "ename"

			int no = rs.getInt(2);

			// column 2

			double salary = rs.getDouble(3);

			System.out.println(name + " " + no + " " + salary);

		}

	}

}
