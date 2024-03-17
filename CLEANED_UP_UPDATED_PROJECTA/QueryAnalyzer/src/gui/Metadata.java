package gui;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class Metadata extends JFrame {

    private JTable contentTable;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                Metadata metadataWindow = new Metadata();
                metadataWindow.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public Metadata() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(100, 100, 600, 400);

        // Title
        JLabel types = new JLabel("Metadata Types");
        types.setHorizontalAlignment(JLabel.CENTER);
        add(types, BorderLayout.NORTH);

        // Subtitle
        JLabel subTitle = new JLabel("Select the Metadata Type you wish to view:");
        subTitle.setHorizontalAlignment(JLabel.CENTER);
        add(subTitle, BorderLayout.CENTER);

        // Button Panel
        JPanel groupButtons = new JPanel();
        groupButtons.setLayout(new FlowLayout());

        // IndexMetadata Button
        JButton indexButton = new JButton("Index");
        groupButtons.add(indexButton);
        indexButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    displayIndexMetadata();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
        });

        // TableMetadata Button
        JButton tableButton = new JButton("Table");
        groupButtons.add(tableButton);
        tableButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    displayTableMetadata();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
        });

        // ColumnMetadata Button
        JButton columnButton = new JButton("Column");
        groupButtons.add(columnButton);
        columnButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    displaycolumnMetadata();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
        });

        add(groupButtons, BorderLayout.NORTH);

        // Content Table
        contentTable = new JTable();
        JScrollPane tableScroll = new JScrollPane(contentTable);
        add(tableScroll, BorderLayout.CENTER);
    }

    //function for displaying index table from our sql connection
    private void displayIndexMetadata() throws SQLException {
        try {
            Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa",
                    "fm1706475", "fm1706475");
            Statement statement = connection.createStatement();
            String query = "SELECT * FROM indexMetadata";
            ResultSet set = statement.executeQuery(query);

            DefaultTableModel index = new DefaultTableModel();
            index.setColumnIdentifiers(getColumnNames(set));

            while (set.next()) {
                Object[] rowData = new Object[index.getColumnCount()];
                for (int i = 0; i < rowData.length; i++) {
                    rowData[i] = set.getObject(i + 1);
                }
                index.addRow(rowData);
            }

            contentTable.setModel(index);

            set.close();
            statement.close();
            connection.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    //function for displaying index table from our sql connection
    private void displayTableMetadata() throws SQLException {
        try {
            Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa",
                    "fm1706475", "fm1706475");
            Statement statement = connection.createStatement();
            String query = "SELECT * FROM tableMetadata";
            ResultSet set = statement.executeQuery(query);

            DefaultTableModel table = new DefaultTableModel();
            table.setColumnIdentifiers(getColumnNames(set));

            while (set.next()) {
                Object[] rowData = new Object[table.getColumnCount()];
                for (int i = 0; i < rowData.length; i++) {
                    rowData[i] = set.getObject(i + 1);
                }
                table.addRow(rowData);
            }

            contentTable.setModel(table);

            set.close();
            statement.close();
            connection.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    //function for displaying index table from our sql connection
    private void displaycolumnMetadata() throws SQLException {
        try {
            Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@coestudb.qu.edu.qa:1521/STUD.qu.edu.qa",
                    "fm1706475", "fm1706475");
            Statement statement = connection.createStatement();
            String query = "SELECT * FROM columnMetadata";
            ResultSet set = statement.executeQuery(query);

            DefaultTableModel column = new DefaultTableModel();
            column.setColumnIdentifiers(getColumnNames(set));

            while (set.next()) {
                Object[] rowData = new Object[column.getColumnCount()];
                for (int i = 0; i < rowData.length; i++) {
                    rowData[i] = set.getObject(i + 1);
                }
                column.addRow(rowData);
            }

            contentTable.setModel(column);

            set.close();
            statement.close();
            connection.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    // the result sets
    private String[] getColumnNames(ResultSet set) throws SQLException {
        ResultSetMetaData metaData = set.getMetaData();
        int count = metaData.getColumnCount();
        String[] columnNames = new String[count];

        for (int i = 1; i <= count; i++) {
            columnNames[i - 1] = metaData.getColumnName(i);
        }

        return columnNames;
    }
}